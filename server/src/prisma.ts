
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query'] //para qualqure operação feita no bd, aparecer no log
});