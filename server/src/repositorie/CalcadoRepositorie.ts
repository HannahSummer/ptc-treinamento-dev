import prisma from "../database";

export const buscarCalcadosPorTamanho = async (tamanho: number) => {
  return prisma.calcado.findMany({
    where: { tamanho },
    orderBy: { id: "asc" },
  });
};

export const filtrarCalcadosPorMarca = async (marca: string) => {
  return prisma.calcado.findMany({
    where: { marca },
    orderBy: { id: "asc" },
  });
};

export const contarTotalDeParesNoEstoque = async (marca?: string) => {
  const where = marca ? { marca } : undefined;

  const resultado = await prisma.calcado.aggregate({
    where,
    _sum: {
      quantidade_em_estoque: true,
    },
  });

  return resultado._sum.quantidade_em_estoque ?? 0;
};
