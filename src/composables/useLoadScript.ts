export const useLoadScript = () => {
  function loadScript(src: string) {
    const script = document.createElement('script');

    script.src = src;
    script.async = true;

    document.head.appendChild(script);
  }

  return {
    loadScript,
  };
};
