export const parseTagListToTree = (tagList) => {
  const list = []
  tagList.forEach((tag) => {
    if (tag.parentId === 0) {
      tag.children = []
      list.push(tag)
    }
  })
  tagList.forEach((tag) => {
    if (tag.parentId !== 0) {
      const targetTag = list.find((t) => t.id === tag.parentId)
      targetTag.children.push(tag)
    }
  })
  return list
}
