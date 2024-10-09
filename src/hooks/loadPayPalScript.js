const loadPayPalScript = (clientId) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("PayPal SDK could not be loaded."));
    document.body.appendChild(script);
  });
};

export default loadPayPalScript;
