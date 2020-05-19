import { useContext } from 'react'

import { RootContext } from '@/containers/shared/RootProvider'

/**
 * 提供整个store
 *
 * @export
 * @returns
 */
export function useRootStore() {
  return useContext(RootContext)
}
