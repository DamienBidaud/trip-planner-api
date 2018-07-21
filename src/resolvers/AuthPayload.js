const author = async (root, args, context, info) => {
  return await context.prisma.query.author({
    where: {
      id: root.author.id
    }
  }, info)
}

module.exports = {
  author
};