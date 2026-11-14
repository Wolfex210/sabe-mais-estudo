import {test,expect} from 'bun:test';
import {languages,canChangeLanguage,translateLabel} from './languages';
test('exactly 10 distinct profile languages',()=>{expect(languages.length).toBe(10);expect(new Set(languages.map(l=>l.code)).size).toBe(10);});
test('only paying members can change language',()=>{expect(canChangeLanguage('trial')).toBe(false);expect(canChangeLanguage(null)).toBe(false);for(const plan of ['basico','medio','master'])expect(canChangeLanguage(plan)).toBe(true);});
test('each language translates navigation',()=>{for(const l of languages.filter(l=>l.code!=='pt'))expect(translateLabel('Meu perfil',l.code)).not.toBe('Meu perfil');});
