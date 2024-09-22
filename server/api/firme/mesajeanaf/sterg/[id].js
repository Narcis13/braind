import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing ID parameter'
    })
  }

  try {
    const deletedMesaj = await prisma.mesajepreluate.delete({
      where: { id: parseInt(id) }
    })

    return {
      message: 'Record deleted successfully',
      deletedMesaj
    }
  } catch (error) {
    console.error('Error deleting record:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error deleting record'
    })
  }
})