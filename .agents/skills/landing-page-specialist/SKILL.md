---
name: landing-page-specialist
description: >-
  Especialista em desenvolvimento de Landing Pages ultrarrápidas, arquitetura estática (Next.js / Astro / Tailwind CSS), otimização de Core Web Vitals (LCP, INP, CLS), rastreamento com dataLayer e formulários resilientes de conversão.
---

# Landing Page Specialist — Runbook & Reference

Este documento fornece padrões técnicos de implementação para a criação de landing pages corporativas de alta conversão para o projeto **LP-Residuos (EcoFlux Soluções e Logística)**.

---

## 1. Padrão de Rastreamento (DataLayer)

Todos os CTAs e formulários devem disparar eventos padronizados para o Google Tag Manager / GA4.

### Helper de Disparo Seguro
```typescript
interface TrackingEvent {
  event: string;
  event_category: 'engagement' | 'lead_generation' | 'navigation';
  event_action: string;
  event_label: string;
  cta_location?: string;
  value?: number;
  [key: string]: unknown;
}

export function pushToDataLayer(payload: TrackingEvent): void {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      ...payload,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    });
  }
}
```

### Eventos Padronizados
- **Clique em CTA Principal**:
  ```javascript
  pushToDataLayer({
    event: 'cta_click',
    event_category: 'engagement',
    event_action: 'click',
    event_label: 'solicitar_orcamento',
    cta_location: 'hero'
  });
  ```
- **Clique no Botão de WhatsApp**:
  ```javascript
  pushToDataLayer({
    event: 'external_link_click',
    event_category: 'engagement',
    event_action: 'click_whatsapp',
    event_label: 'falar_com_especialista',
    cta_location: 'floating_button'
  });
  ```
- **Envio de Formulário de Lead com Sucesso**:
  ```javascript
  pushToDataLayer({
    event: 'generate_lead',
    event_category: 'lead_generation',
    event_action: 'form_submit_success',
    event_label: 'formulario_orcamento_residuos'
  });
  ```

---

## 2. Padrão de Formulário Resiliente

```html
<form id="leadForm" class="space-y-4" novalidate>
  <div>
    <label for="name" class="block text-sm font-semibold text-gray-700 mb-1">Nome Completo *</label>
    <input type="text" id="name" name="name" required
      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition"
      placeholder="Seu nome ou da sua empresa" />
  </div>

  <div>
    <label for="phone" class="block text-sm font-semibold text-gray-700 mb-1">WhatsApp / Telefone *</label>
    <input type="tel" id="phone" name="phone" required
      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition"
      placeholder="(00) 00000-0000" />
  </div>

  <div>
    <label for="wasteType" class="block text-sm font-semibold text-gray-700 mb-1">Tipo de Resíduo *</label>
    <select id="wasteType" name="wasteType" required
      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none transition">
      <option value="">Selecione o tipo de resíduo</option>
      <option value="industrial">Resíduos Industriais (Classe I / Perigosos)</option>
      <option value="classe2">Resíduos Classe II (Não Perigosos / Inertes)</option>
      <option value="saude">Resíduos de Serviços de Saúde (RSS)</option>
      <option value="construcao">Construção Civil (RCC)</option>
      <option value="logistica">Logística Reversa / Sucatas</option>
    </select>
  </div>

  <!-- Botão com estados de carregamento -->
  <button type="submit" id="submitBtn" data-tracking="form-submit-lead"
    class="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold rounded-lg shadow-lg hover:shadow-emerald-600/30 transition duration-200 flex items-center justify-center gap-2">
    <span class="btn-text">Solicitar Diagnóstico e Orçamento</span>
    <span class="btn-spinner hidden animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
  </button>

  <!-- Feedbacks visuais -->
  <div id="formSuccess" class="hidden p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm text-center">
    Solicitação recebida com sucesso! Nossos especialistas entrarão em contato em até 1 hora.
  </div>
  <div id="formError" class="hidden p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm text-center">
    Ocorreu um erro ao enviar. Por favor, tente novamente ou fale conosco diretamente pelo WhatsApp.
  </div>
</form>
```

---

## 3. SEO e Metadados Padrão

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EcoFlux | Soluções em Gestão e Logística de Resíduos</title>
  <meta name="description" content="Gestão completa, transporte e destinação responsável de resíduos industriais e comerciais. Regularize sua empresa com agilidade e total conformidade ambiental." />
  
  <!-- Open Graph / Redes Sociais -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="EcoFlux | Soluções em Gestão e Logística de Resíduos" />
  <meta property="og:description" content="Gestão completa, transporte e destinação responsável de resíduos com total conformidade ambiental e agilidade." />
  <meta property="og:image" content="/assets/Logo_EcoFlux_Solucoes_e_Logistica.png" />
  <meta property="og:url" content="https://ecoflux.com.br" />
  
  <!-- Core Web Vitals Hints -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
```
