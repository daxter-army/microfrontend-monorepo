import React, { useRef, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { mount } from "marketing/MarketingApp"

export default () => {
	const ref = useRef(null)
	const history = useHistory()

	useEffect(() => {
		if (!ref) return

		const { onParentNavigate } = mount(ref.current, {
			initialPath: history.location.pathname,
			onNavigate: ({ pathname: nextPathname }) => {
				console.log("Navigation in MARKETING!: ", nextPathname)

				const { pathname } = history.location

				// ONLY CHANGE IF WE ARE NOT PRESENT HERE
				if (pathname !== nextPathname) {
					history.push(nextPathname)
				}
			}
		})

		history.listen(onParentNavigate)
	}, [])

	return <div ref={ref}></div>
}