import React, { createContext } from 'react'

import * as store from '@store/index'

export const RootContext = createContext<IAllStore>(null)

/**
 * RootProvider
 *
 * 使用hook获取store数据，替代mobx Provider
 *
 * @export
 * @param {{ children?: React.ReactNode }} { children }
 * @returns
 */

export default function RootProvider({ children }: { children?: React.ReactNode }) {
    return <RootContext.Provider value={{ ...store }}>{children}</RootContext.Provider>
}
