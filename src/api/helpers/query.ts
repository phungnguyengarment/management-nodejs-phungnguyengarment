import { Op, WhereOptions } from 'sequelize'
import { RequestBodyType } from '~/type'

export const buildDynamicQuery = <T>(params: RequestBodyType): WhereOptions<T> | undefined => {
  let conditions: WhereOptions<T> = {}

  // Kiểm tra và thêm điều kiện cho mỗi tham số cần truy vấn
  if (params.filter.items.includes(-1)) {
    conditions = { ...conditions, status: params.filter.status }
  } else {
    conditions = { ...conditions, [params.filter.field]: { [Op.in]: params.filter.items } }
  }

  if (params.search.term.length > 0) {
    conditions = { ...conditions, [params.search.field]: { [Op.like]: `%${params.search.term}%` } }
  }
  return Object.keys(conditions).length > 0 ? conditions : undefined
}
