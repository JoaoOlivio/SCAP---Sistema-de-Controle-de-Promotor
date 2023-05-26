-- SQLite
SELECT AVG(a.nota) AS media_avaliacoes
  FROM avaliacoes a
INNER JOIN entradas e on a.entrada_id = e.id
INNER JOIN promotor_fornecedores pf on e.promotor_fornecedor_id = pf.id
<<<<<<< HEAD
WHERE pf.promotor_id = ${req.body.id}
=======
WHERE pf.promotor_id = 1
>>>>>>> 3fd8bac879cb57bcf12d87792c000f04842505c9
ORDER BY a.created_at DESC
LIMIT 3

SELECT COUNT(*) AS servicos_nao_concluidos
  FROM avaliacoes
 WHERE id IN (SELECT a.id
                FROM avaliacoes a
              INNER JOIN entradas e on a.entrada_id = e.id
			        INNER JOIN promotor_fornecedores pf on e.promotor_fornecedor_id = pf.id
<<<<<<< HEAD
               WHERE pf.promotor_id = ${req.body.id}
=======
               WHERE pf.promotor_id = 1  --${req.body.id}
>>>>>>> 3fd8bac879cb57bcf12d87792c000f04842505c9
              ORDER BY a.created_at DESC
              LIMIT 3
 )
 AND servico_concluido = false;	