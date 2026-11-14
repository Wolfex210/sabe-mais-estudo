import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { isLanguageCode, canChangeLanguage } from './languages';
export const saveLanguage = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
 .inputValidator((input: {code: string}) => { if (!isLanguageCode(input?.code)) throw new Error('Idioma inválido'); return {code:input.code}; })
 .handler(async ({ data, context }) => {
  const {resolveSubscriptionPlan} = await import('./subscription-plan.server');
  if (!canChangeLanguage(await resolveSubscriptionPlan(context.supabase,context.userId))) return {ok:false,error:'A troca de idioma está disponível para assinantes.'};
  const { data: row } = await context.supabase.from('student_study_data').select('progress').eq('user_id', context.userId).maybeSingle();
  const progress = row?.progress && typeof row.progress === 'object' && !Array.isArray(row.progress) ? row.progress : {};
  const {error} = await context.supabase.from('student_study_data').upsert({user_id:context.userId,progress:{...progress,language:data.code}});
  return error ? {ok:false,error:'Não foi possível salvar o idioma.'} : {ok:true,error:''};
 });
