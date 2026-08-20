const supabaseUrl = "https://gemossrqtraurvgixzcp.supabase.co";
const supabaseKey = "sb_publishable_DazWVji8SXXLbd61i8WL4A_cDEwKZ2v";

const supabaseClient = supabase.createClient(
  supabaseUrl,
  supabaseKey
);

document
  .getElementById("orcamentoForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const dados = {
      nome: document.getElementById("nome").value,
      telefone: document.getElementById("telefone").value,
      tipo_evento: document.getElementById("tipo_evento").value,
      data_evento: document.getElementById("data_evento").value
    };

    dados["e-mail"] =
      document.getElementById("email").value;

    const { error } = await supabaseClient
      .from("Orçamentos")
      .insert([dados]);

    if (error) {
      console.error(error);
      alert("Erro: " + error.message);
      return;
    }

    alert("Orçamento enviado com sucesso!");

    document
      .getElementById("orcamentoForm")
      .reset();
});
