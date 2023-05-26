-- SQLite
SELECT * --AVG(a.nota) AS media_avaliacoes
  FROM avaliacoes a
INNER JOIN entradas e on a.entrada_id = e.id
INNER JOIN promotor_fornecedores pf on e.promotor_fornecedor_id = pf.promotor_id
 --WHERE usuario_id = 1
ORDER BY a.created_at DESC
LIMIT 3



SELECT * from avaliacoes