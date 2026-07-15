const posts = [
  {
    title: "Como Impulsionar seu SEO sem Backend",
    link: "posts/como-impulsionar-seo.html",
    date: "15 de Julho de 2025",
    description: "Aprenda como melhorar seu posicionamento no Google com estratégias práticas, mesmo sem backend.",
  },
  // próximos posts aqui
];

document.addEventListener("DOMContentLoaded", function () {
    const titulo = document.getElementById("titulo");
    const texto = "Insights, sugestões, tendências e mais.";
    let index = 0;

    function digitar() {
        if (index < texto.length) {
            titulo.textContent += texto.charAt(index);
            index++;
            setTimeout(digitar, 80); // Velocidade da digitação em milissegundos
        }
    }

    digitar();
});