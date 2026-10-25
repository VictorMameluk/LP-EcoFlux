# Agente Especialista Front-End — Landing Pages de Alta Performance

Este repositório é gerenciado pelas diretrizes do Engenheiro Front-End Sênior especialista em Landing Pages ultrarrápidas, arquitetura estática e mensuração avançada de marketing.

Consulte o arquivo principal de regras e especificações em [AGENTS.md](file:///c:/Users/Victor/Documents/LP-Residuos/AGENTS.md).

## Resumo das Diretrizes

1. **Performance First**: Priorize HTML estático e CSS mínimo. Utilize Astro Islands ou React Server Components. Zero JavaScript supérfluo no client-side.
2. **Código Semântico e Acessibilidade**: Tags semânticas (<header>, <main>, <section>, etc.), contraste WCAG AA, focus states claros e navegação por teclado.
3. **Contrato de Rastreamento (DataLayer)**: Todos os botões, CTAs e formulários com `data-tracking="..."` e disparo de eventos `window.dataLayer.push({ event: '...' })`.
4. **Formulários e Resiliência**: Validação client-side, estados visuais (idle, loading, success, error) e submissão assíncrona para endpoints/webhooks.
5. **Formato Padrão**: Código com Tailwind CSS pronto para produção, modular, com metadados de SEO (Open Graph) e scripts de tracking integrados.
