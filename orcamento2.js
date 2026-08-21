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
  data_evento: document.getElementById("data_evento").value,

  horario_inicio:
    document.getElementById("horario_inicio").value,

  horario_fim:
    document.getElementById("horario_fim").value,

  duracao_show:
    document.getElementById("duracao_show").value,

  cidade:
    document.getElementById("cidade").value,

  endereco:
    document.getElementById("endereco").value,

  sonorizacao:
    document.getElementById("sonorizacao").checked,

  descricao_som:
    document.getElementById("descricao_som").value,

  qnt_pessoas:
    parseInt(
      document.getElementById("qnt_pessoas").value || 0
    ),

  aberto_fechado:
    document.getElementById("aberto_fechado").value
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
  const chkSonorizacao =
  document.getElementById("sonorizacao");

const camposSonorizacao =
  document.getElementById("camposSonorizacao");

chkSonorizacao.addEventListener("change", () => {

  if (chkSonorizacao.checked) {
    camposSonorizacao.style.display = "block";
  } else {
    camposSonorizacao.style.display = "none";
  }

});
