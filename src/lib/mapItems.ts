// lib/mapItems.ts
export const formatMapItems = (
  docs: any[],
  options: {
    hasPrice?: boolean
    titleField?: 'title' | 'name'
  } = {}
) => {
  const { hasPrice = true, titleField = 'title' } = options

  return docs
    .filter(doc => {
      // Проверяем, что координаты существуют и являются числами
      const lat = doc.coordinates?.lat
      const lng = doc.coordinates?.lng
      return (
        typeof lat === 'number' &&
        typeof lng === 'number' &&
        !isNaN(lat) &&
        !isNaN(lng)
      )
    })
    .map(doc => ({
      id: String(doc.id),
      title: doc[titleField] || 'Без названия',
      price: hasPrice ? doc.price : undefined,
      address: doc.location?.address || '',
      lat: doc.coordinates.lat,
      lng: doc.coordinates.lng,
      slug: doc.slug,
    }))
}