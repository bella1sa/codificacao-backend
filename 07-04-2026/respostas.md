EXERCICIO 1 
    *Por que PATCH é a melhor escolha nesse caso? 
    Porque a gente só quer mudar uma parte do objeto (o nome da fruta), então não precisa mandar tudo de novo.
    O PATCH serve justamente pra isso.

    *O que significa atualização parcial?
    Significa que você altera só uma parte do objeto, sem mexer no resto.

    *O que acontece quando você envia apenas um campo?
    Só aquele campo é alterado, o resto continua igual como já estava.

EXERCICIO 2:

    *Por que PUT é considerado uma substituição completa?
    Porque ele troca o objeto inteiro por outro novo, não é só uma parte, é tudo


    *Qual é a diferença entre substituir e atualizar parcialmente?
    Substituir (PUT) é trocar tudo, e atualizar parcialmente (PATCH) é mudar só algumas coisas.

    *Se o objeto tivesse mais campos, o que poderia acontecer se eles não fossem enviados?
    Eles podem sumir ou ficar vazios, porque o PUT entende que você tá mandando um novo objeto completo.