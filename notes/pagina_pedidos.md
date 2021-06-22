1. Lista de pedidos do dia

 - Escolher data. Default: HOJE
 - Sempre ordenado pelo HORÁRIO DE ENTREGA
 - Lista os pedidos: 

### | HH:MM | NOME DO CLIENTE  | ENDEREÇO                    | PEDIDO       | PAG.    | ESTADO
#23 | 19:50 | Ana Maria Barros | R. Ailton Vilela de Moraes, | 1 margherita | R$27,70 | ENTREGANDO
#   |       |                  | 231, Heliópolis             | 1 della casa | Cartão  |

   - Atualizar estado (aceito, preparando, pronto, saindo para entrega, entregue, pago
 - Quando algo SAI PARA ENTREGA, deve-se criar o Delivery, associar o Deliveryman, horário de saída etc.
 - Quando algo é PAGO, deve-se criar a transação!

2. Criar novo pedido
 - Ao clicar em criar novo pedido, talvez seja suficiente
   - Criar um novo pedido com uma entrega. A entrega sempre inclui todos os itens, embora isso possa ser editado na parte completa do sistema. (essa página se refere unicamente a pedidos delivery)
   - Adicionar à lista, mesmo sem o nome do cliente. ("SEM NOME")
 - Ao clicar no nome, aparece o popup para selecionar um cliente:
   - Pesquisar por qualquer informação associada (telefone, endereço etc.)

3. Alterar estado
 - Clicar no estado atual
 - Aparece popup com opçoes de atualização.
 - Campo para comentários
 - Botão para atualizar

4. O horário: 
 - De inicio é colocado automaticamente como +50 minutos.
 - Pode-se alterar clicando no valor (daí aparece um popup com o horário que o pedido foi feito etc.)

5. Endereço:
 - Pode-se escolher um dos endereços do cliente ou colocar outro. O endereço favorito do cliente já é automaticamente adicionado ao escolher um cliente
