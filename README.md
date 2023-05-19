# SCAP---Sistema-de-Controle-de-Promotor
 Sistema-de-Controle-de-Promotor

# João Olívio
- Avaliação (RN)
- Destaque
- Perfil
- Produto

-> Regra de Negócio
    - Se o promotor tiver os 3 últimos serviços sem ser finalizado, o sistema exibe um alerta desse promotor.
    - Se a média das últimas 3 avaliações for menor que 6, será emitido um alerta desse promotor.


# Gabriel Zachi
- Entrada (RN)
- Fornecedor
- Promotor
- PromotorFornecedor

-> Regra de Negócio
    - Não poderá ter um novo registro de entrada, caso esse promotor já tenha um registro de entrada em aberto. 
    - Só é permitida a entrada de 10 pessoas por momento.

# Diogo Oliveira
- Saída (RN)
- Loja
- Portao
- Usuário 

-> Regra de Negócio
    - Só será liberada a saída, caso o promotor tenha sido avaliado.
    - Se no mesmo dia não for feita a saída da entrada, quando o for aberta a tela de registrar saída, será chamada uma função que realizará as saídas pendentes do dia anterior. (Verificar quando for aberta a tela)

