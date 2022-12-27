import React, { useRef, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { mount } from "auth/AuthApp"

export default ({ onSignIn }) => {
	const ref = useRef(null)
	const history = useHistory()

	useEffect(() => {
		if (!ref) return

		const { onParentNavigate } = mount(ref.current, {
			initialPath: history.location.pathname,
			onNavigate: ({ pathname: nextPathname }) => {
				console.log("Navigation in AUTH: ", nextPathname)

				const { pathname } = history.location

				// ONLY CHANGE IF WE ARE NOT PRESENT HERE
				if (pathname !== nextPathname) {
					history.push(nextPathname)
				}
			},
			onSignIn: () => {
				onSignIn()
			}
		})

		history.listen(onParentNavigate)
	}, [])

	return <div ref={ref}></div>
}