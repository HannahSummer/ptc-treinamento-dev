import { Request, Response } from "express";
import prisma from "@database";
import {
  buscarCalcadosPorTamanho,
  filtrarCalcadosPorMarca,
  contarTotalDeParesNoEstoque,
} from "../repositorie/CalcadoRepositorie";

// convertendo e validando o id
const parseId = (value: string): number | null => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
};

export const createCalcado = async (req: Request, res: Response) => {
  try {
    const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = req.body;

    // Validando os campos obrigatórios - se não estiverem retornará a mensagem de erro
    if (
      !nome_produto ||
      !cor ||
      !marca ||
      tamanho === undefined ||
      preco === undefined ||
      quantidade_em_estoque === undefined
    ) {
      return res.status(400).json({
        message: "Preencha todos os campos obrigatorios do calcado.",
      });
    }

    // Cria o calcado no banco com tipagem numerica para os campos numericos.
    const calcado = await prisma.calcado.create({
      data: {
        nome_produto,
        cor,
        marca,
        tamanho: Number(tamanho),
        preco: Number(preco),
        quantidade_em_estoque: Number(quantidade_em_estoque),
      },
    });

    return res.status(201).json(calcado);
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao criar calcado.",
      error,
    });
  }
};

export const readAllCalcados = async (_req: Request, res: Response) => {
  try {
    // Listando todos os calçados por id, para falicilitar a leitura e os testes 
    const calcados = await prisma.calcado.findMany({
      orderBy: { id: "asc" },
    });

    return res.status(200).json(calcados);
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao listar calcados.",
      error,
    });
  }
};

export const readCalcadosById = async (req: Request, res: Response) => {
  try {
    // Listando calçado por id, para falicilitar a leitura e os testes 
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: "Id inválido." });
    }
    const calcados = await prisma.calcado.findUnique({
      where: { id },
    });

    return res.status(200).json(calcados);
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao listar calcados.",
      error,
    });
  }
};

export const updateCalcado = async (req: Request, res: Response) => {
  try {
    // Validação se o código (id) esta certo antes de consultar o banco.
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({
        message: "ID invalido.",
      });
    }

    // Evita atualiazação em caso de registro inexistente.
    const existente = await prisma.calcado.findUnique({ where: { id } });
    if (!existente) {
      return res.status(404).json({
        message: "Calcado nao encontrado.",
      });
    }

    const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = req.body;

    // Atualiza apenas os campos enviados no PATCH.
    const calcado = await prisma.calcado.update({
      where: { id },
      data: {
        ...(nome_produto !== undefined && { nome_produto }),
        ...(cor !== undefined && { cor }),
        ...(marca !== undefined && { marca }),
        ...(tamanho !== undefined && { tamanho: Number(tamanho) }),
        ...(preco !== undefined && { preco: Number(preco) }),
        ...(quantidade_em_estoque !== undefined && {
          quantidade_em_estoque: Number(quantidade_em_estoque),
        }),
      },
    });

    return res.status(200).json(calcado);
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao atualizar calcado.",
      error,
    });
  }
};

export const deleteCalcado = async (req: Request, res: Response) => {
  try {
    // Valida id da url antes de executar delete.
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({
        message: "ID invalido.",
      });
    }

    // Conferindo a existencia do item para retornar o erro de forma clara.
    const existente = await prisma.calcado.findUnique({ where: { id } });
    if (!existente) {
      return res.status(404).json({
        message: "Calcado nao encontrado.",
      });
    }

    await prisma.calcado.delete({ where: { id } });
    return res.status(200).json({ message: "Calcado removido com sucesso." });
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao remover calcado.",
      error,
    });
  }
};

export const readCalcadosByTamanho = async (req: Request, res: Response) => {
  try {
    const tamanho = Number(req.params.tamanho);

    if (!Number.isInteger(tamanho) || tamanho <= 0) {
      return res.status(400).json({ message: "Tamanho invalido." });
    }

    const calcados = await buscarCalcadosPorTamanho(tamanho);
    return res.status(200).json(calcados);
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao buscar calcados por tamanho.",
      error,
    });
  }
};

export const readCalcadosByMarca = async (req: Request, res: Response) => {
  try {
    const marca = String(req.params.marca || "").trim();

    if (!marca) {
      return res.status(400).json({ message: "Marca invalida." });
    }

    const calcados = await filtrarCalcadosPorMarca(marca);
    return res.status(200).json(calcados);
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao filtrar calcados por marca.",
      error,
    });
  }
};

export const countCalcadosTotal = async (req: Request, res: Response) => {
  try {
    const marca = String(req.query.marca || "").trim() || undefined;
    const total = await contarTotalDeParesNoEstoque(marca);
    return res.status(200).json({ total_de_pares: total });
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao contar pares no estoque.",
      error,
    });
  }
};
