import { useContext } from 'react'

import { RootContext } from '@shared/RootProvider'

/**
 * 提供整个store
 *
 * @export
 * @returns
 */
export function useRootStore() {
    return useContext(RootContext)
}