import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'SecureForm',
  props: {
    secureData: {
      type: Object,
      required: true,
    },
  },
  // eslint-disable-next-line
  render() {
    return h('div', [
      h(
        'form',
        {
          name: 'downloadForm',
          action: this.secureData.AcsUrl,
          method: 'POST',
        },
        [
          h('input', {
            type: 'hidden',
            name: 'PaReq',
            id: 'paReq',
            value: this.secureData.PaReq,
          }),
          h('input', {
            type: 'hidden',
            id: 'md',
            name: 'MD',
            value: this.secureData.MD,
          }),
          h('input', {
            type: 'hidden',
            id: 'termUrl',
            name: 'TermUrl',
            value: 'http://api-kuryltai.kz/api/v0/payments/complete-3d-secure/',
          }),
        ],
      ),
      h('script', `window.onload = submitForm; function submitForm() { document.downloadForm.submit(); }`),
    ]);
  },
});
