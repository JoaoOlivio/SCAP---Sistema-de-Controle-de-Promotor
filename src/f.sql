-- SQLite
SELECT AVG(a.nota) AS media_avaliacoes
  FROM avaliacoes a
INNER JOIN entradas e on a.entrada_id = e.id
INNER JOIN promotor_fornecedores pf on e.promotor_fornecedor_id = pf.id
WHERE pf.promotor_id = ${req.body.id}
ORDER BY a.created_at DESC
LIMIT 3

SELECT COUNT(*) AS servicos_nao_concluidos
  FROM avaliacoes
 WHERE id IN (SELECT a.id
                FROM avaliacoes a
              INNER JOIN entradas e on a.entrada_id = e.id
			        INNER JOIN promotor_fornecedores pf on e.promotor_fornecedor_id = pf.id
               WHERE pf.promotor_id = ${req.body.id}
              ORDER BY a.created_at DESC
              LIMIT 3
 )
 AND servico_concluido = false;	