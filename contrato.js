const supabaseUrl = "https://gemossrqtraurvgixzcp.supabase.co";
const supabaseKey = "sb_publishable_DazWVji8SXXLbd61i8WL4A_cDEwKZ2v";

const supabaseClient = window.supabase.createClient(
  'https://gemossrqtraurvgixzcp.supabase.co',
  'sb_publishable_DazWVji8SXXLbd61i8WL4A_cDEwKZ2v'
);

const params = new URLSearchParams(
  window.location.search
);

const contratoId = params.get('id');
console.log('ID recebido:', contratoId);
carregarContrato();

async function carregarContrato() {

  const { data, error } = await supabaseClient
    .from('Contratos')
    .select('*')
    .eq('id', contratoId)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  document.getElementById('nome_completo').value =
    data.nome_completo || '';

  document.getElementById('telefone').value =
    data.telefone || '';

  document.getElementById('email').value =
    data.email || '';
}

document
  .getElementById('contratoForm')
  .addEventListener('submit', async (e) => {

    e.preventDefault();

    const dados = {

      nome_completo:
        document.getElementById(
          'nome_completo'
        ).value,

      cpf:
        document.getElementById(
          'cpf'
        ).value,

      rg:
        document.getElementById(
          'rg'
        ).value,

      estado_civil:
        document.getElementById(
          'estado_civil'
        ).value,

      profissao:
        document.getElementById(
          'profissao'
        ).value,

      email:
        document.getElementById(
          'email'
        ).value,

      telefone:
        document.getElementById(
          'telefone'
        ).value,

      cep:
        document.getElementById(
          'cep'
        ).value,

      endereco:
        document.getElementById(
          'endereco'
        ).value,

      numero:
        document.getElementById(
          'numero'
        ).value,

      complemento:
        document.getElementById(
          'complemento'
        ).value,

      bairro:
        document.getElementById(
          'bairro'
        ).value,

      cidade:
        document.getElementById(
          'cidade'
        ).value,

      estado:
        document.getElementById(
          'estado'
        ).value,

      status_contrato:
        'dados_preenchidos',
    };

    const { error } = await supabase
      .from('Contratos')
      .update(dados)
      .eq('id', contratoId);

    const msg =
      document.getElementById('msg');

    if (error) {

      msg.innerHTML =
        'Erro ao enviar os dados.';

      msg.style.color = 'red';

      return;
    }

    msg.innerHTML =
      'Dados enviados com sucesso!';

    msg.style.color = 'lime';
  });
document.getElementById('contratoForm')
  .addEventListener('submit', async function(e) {

    e.preventDefault();

    console.log('Botão Enviar clicado');

});
