import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type TutorMessage = { role: "user" | "assistant"; content: string };

export const askStudyTutor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { messages: TutorMessage[]; subject?: string; schoolYear?: string }) => {
    if (!Array.isArray(data.messages) || data.messages.length < 1 || data.messages.length > 12) {
      throw new Error("Envie uma conversa válida com até 12 mensagens.");
    }
    const messages = data.messages.map((message) => {
      if (!message || !["user", "assistant"].includes(message.role) || typeof message.content !== "string") {
        throw new Error("Mensagem inválida.");
      }
      const content = message.content.trim();
      if (!content || content.length > 4000) throw new Error("Cada mensagem deve ter entre 1 e 4000 caracteres.");
      return { role: message.role, content };
    });
    return {
      messages,
      subject: typeof data.subject === "string" ? data.subject.slice(0, 100) : "",
      schoolYear: typeof data.schoolYear === "string" ? data.schoolYear.slice(0, 100) : "",
    };
  })
  .handler(async ({ data, context }): Promise<{ answer: string } | { error: string }> => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return { error: "O Tutor IA ainda não está conectado. Configure o segredo OPENAI_API_KEY nas configurações do projeto Lovable e publique novamente." };
    }

    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          instructions: [
            "Você é o Tutor de Estudos do Sabe Mais, um tutor educacional paciente, acolhedor e preciso.",
            "Responda em português brasileiro, explique conceitos passo a passo e adapte a linguagem ao ano escolar informado.",
            "Ajude o estudante a aprender: faça perguntas orientadoras quando útil, mostre exemplos e confira cálculos.",
            "Não invente fontes ou fatos. Se não tiver certeza, diga isso. Em temas escolares, prefira explicações claras e estruturadas.",
            "Se o estudante pedir uma resposta de exercício, explique o raciocínio em vez de apenas entregar o resultado.",
            "Não solicite senhas, dados financeiros ou informações pessoais sensíveis.",
            `Matéria de interesse: ${data.subject || "não especificada"}.`,
            `Ano/série: ${data.schoolYear || "não informado"}.`,
            `Identificador interno do estudante autenticado: ${context.userId}. Não revele nem use este identificador na resposta.`,
          ].join("\n"),
          input: data.messages.map((message) => ({
            role: message.role,
            content: [{ type: "input_text", text: message.content }],
          })),
          max_output_tokens: 900,
        }),
      });

      if (!response.ok) {
        const detail = await response.text();
        console.error("Falha no provedor do Tutor IA:", response.status, detail.slice(0, 500));
        if (response.status === 401 || response.status === 403) {
          return { error: "A chave da IA não foi aceita. Confira o segredo OPENAI_API_KEY nas configurações do Lovable." };
        }
        if (response.status === 429) return { error: "O Tutor IA está com muitas solicitações ou sem cota disponível. Tente novamente mais tarde." };
        return { error: "Não consegui responder agora. Tente novamente em instantes." };
      }

      const payload = await response.json() as {
        output_text?: string;
        output?: { content?: { type?: string; text?: string }[] }[];
      };
      const answer = payload.output_text ?? payload.output
        ?.flatMap((item) => item.content ?? [])
        .filter((part) => part.type === "output_text")
        .map((part) => part.text ?? "")
        .join("\n")
        .trim();

      if (!answer) return { error: "A IA não retornou uma resposta. Tente reformular sua pergunta." };
      return { answer };
    } catch (error) {
      console.error("Erro no Tutor IA:", error);
      return { error: "O Tutor IA não conseguiu se conectar. Verifique a conexão e tente novamente." };
    }
  });
