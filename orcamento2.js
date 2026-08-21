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
const cidadeSelecionada =
  document.getElementById("cidade").value;

const { data: cidadeInfo, error: cidadeErro } =
  await supabaseClient
    .from("cidades_mg")
    .select("distancia_bh")
    .eq("cidade", cidadeSelecionada)
    .single();

if (cidadeErro) {
  console.error(cidadeErro);
}
console.log("Cidade selecionada:", cidadeSelecionada);
console.log("Cidade encontrada:", cidadeInfo);
console.log("Erro cidade:", cidadeErro);
    const distancia = cidadeInfo?.distancia_bh || 0;

    const sonorizacao =
    document.getElementById("sonorizacao").checked;

    const valorDeslocamento =
    sonorizacao ? distancia * 6.0 : distancia * 3.0;
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
  
  distancia_bh:
  cidadeInfo?.distancia_bh || 0,

  valor_deslocamento:
  valorDeslocamento,

  endereco:
    document.getElementById("endereco").value,

  sonorizacao:
    document.getElementById("sonorizacao").checked,

    qnt_pessoas:
    parseInt(
      document.getElementById("qnt_pessoas").value || 0
    ),

  aberto_fechado:
  document.getElementById("aberto_fechado").value,
};
  console.log("Dados enviados:", dados);
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
  document
  .getElementById("btnLimpar")
  .addEventListener("click", () => {

    document
      .getElementById("orcamentoForm")
      .reset();

    document
      .getElementById("camposSonorizacao")
      .style.display = "none";

});
  async function carregarCidades() {

  const { data, error } = await supabaseClient
    .from("cidades_mg")
    .select("cidade")
    .order("cidade");

  if (error) {
    console.error(error);
    return;
  }

  const cidadeSelect =
    document.getElementById("cidade");

  cidadeSelect.innerHTML =
    '<option value="">Selecione a cidade...</option>';

  cidadeSelect.innerHTML +=
    '<option value="Belo Horizonte">Belo Horizonte</option>';

  data.forEach(item => {

    if (item.cidade === "Belo Horizonte") {
      return;
    }

    cidadeSelect.innerHTML +=
      `<option value="${item.cidade}">
        ${item.cidade}
      </option>`;

  });

  cidadeSelect.innerHTML +=
    '<option value="Outra cidade">Outra cidade (fora de MG)</option>';

}

carregarCidades();

document
  .getElementById("cidade")
  .addEventListener("change", () => {

    const cidadeSelecionada =
      document.getElementById("cidade").value;

    const cidadeOutraDiv =
      document.getElementById("cidadeOutraDiv");

    if (cidadeSelecionada === "Outra cidade") {
      cidadeOutraDiv.style.display = "block";
    } else {
      cidadeOutraDiv.style.display = "none";
    }

});
