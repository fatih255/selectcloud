type Props = {
	itemsClass: string;
	containerClass: string;
	cloudStyle?: string;
	crossEffect: ({
		style,
		classList
	}: {
		style: CSSStyleDeclaration;
		classList: DOMTokenList;
	}) => void;
	onComplete: (elements?: Element[]) => void;
};

let runnedSelectWithCloud = false;
export default function SelectWithCloud({
	itemsClass,
	containerClass,
	cloudStyle,
	crossEffect,
	onComplete
}: Props) {
	if (!runnedSelectWithCloud) {
		const container = document.querySelector(
			`.${containerClass}`
		) as HTMLElement;
		container.style.userSelect = "none";
		container.style.position = "relative";
		container.draggable = false;
		const cloudSelection = document.createElement("div") as HTMLDivElement;
		cloudSelection.draggable = false;
		container.append(cloudSelection);

		let intersectionsNotes: Element[] = [];
		let notes = Array.from(
			document.querySelectorAll(`.${itemsClass}`)
		) as HTMLElement[];
		const notesInitialStyle = notes[0].getAttribute("style") ?? "";
		const notesInitialClass = notes[0].getAttribute("class") ?? "";
		notes.forEach((note) => {
			if (!intersectionsNotes.includes(note)) {
				note.setAttribute("style", notesInitialStyle);
				note.setAttribute("class", notesInitialClass);
			}
		});

		const resizeObserver = new ResizeObserver((entries) => {
			const cloud = entries[0].target as HTMLElement;
			const intersections = notes.filter(
				(note) =>
					cloud.offsetLeft <= note.offsetLeft + note.offsetWidth &&
					cloud.offsetHeight + cloud.offsetTop >= note.offsetTop &&
					cloud.offsetTop <= note.offsetHeight + note.offsetTop
			);

			intersections.forEach((note): void => {
				crossEffect({ style: note.style, classList: note.classList });
			});
			notes.forEach((note) => {
				if (!intersectionsNotes.includes(note)) {
					note.setAttribute("style", notesInitialStyle);
					note.setAttribute("class", notesInitialClass);
				}
			});
			intersectionsNotes = intersections;
		});
		resizeObserver.observe(cloudSelection);

		const startPosition = { x: 0, y: 0, pureY: 0, scrollY: 0 };
		let scrollingActive = false;
		const mouseMoveHandler = (e: MouseEvent) => {
			if (
				cloudSelection.offsetHeight > 100 &&
				e.clientY > window.innerHeight * 0.9
			) {
				window.scrollTo({
					top: window.scrollY + document.documentElement.scrollHeight * 0.3,
					behavior: "smooth"
				});
				// console.log("scrolling bottom");
				scrollingActive = true;
			}
			if (
				cloudSelection.offsetHeight > 100 &&
				e.clientY < window.innerHeight * 0.1 &&
				window.scrollY !== 0
			) {
				window.scrollTo({
					top: window.scrollY - document.documentElement.scrollHeight * 0.3,
					behavior: "smooth"
				});

				scrollingActive = true;
			}

			if (e.clientX < startPosition.x) {
				cloudSelection.style.left = e.clientX - container.offsetLeft + "px";
				cloudSelection.style.width = startPosition.x - e.clientX + "px";
			} else {
				cloudSelection.style.left =
					startPosition.x - container.offsetLeft + "px";
				cloudSelection.style.width = e.clientX - startPosition.x + "px";
			}
			if (e.clientY < startPosition.y - container.offsetTop - window.scrollY) {
				// console.log("up");
				cloudSelection.style.top =
					e.clientY + window.scrollY - container.offsetTop + "px";
				cloudSelection.style.height =
					startPosition.y -
					container.offsetTop -
					window.scrollY -
					e.clientY +
					"px";
			} else {
				// console.log("down");

				cloudSelection.style.top =
					startPosition.pureY -
					container.offsetTop +
					startPosition.scrollY +
					"px";
				cloudSelection.style.height =
					e.clientY -
					cloudSelection.offsetTop -
					container.offsetTop +
					window.scrollY +
					"px";
			}
		};
		const mouseDownHandler = (e: MouseEvent) => {
			document.documentElement.draggable = false;
			document.documentElement.style.userSelect = "none";
			notes = Array.from(
				document.querySelectorAll(`.${itemsClass}`)
			) as HTMLElement[];
			notes.forEach((note) => {
				if (!intersectionsNotes.includes(note)) {
					note.setAttribute("style", notesInitialStyle);
					note.setAttribute("class", notesInitialClass);
				}
			});
			cloudSelection.setAttribute(
				"style",
				`position:absolute; ${
					cloudStyle
						? cloudStyle
						: "background:rgb(9, 113, 241,.2) ;  border-radius:5px;border: 2px solid rgb(9, 113, 241,.4)"
				}`
			);

			cloudSelection.style.left = e.clientX + "px";
			cloudSelection.style.top =
				container.offsetTop + e.clientY + window.scrollY + "px";
			startPosition.scrollY = window.scrollY;
			startPosition.x = e.clientX;
			startPosition.pureY = e.clientY;
			startPosition.y = container.offsetTop + e.clientY + window.scrollY;
			container.addEventListener("mousemove", mouseMoveHandler);
		};
		const mouseUpHandler = () => {
			scrollingActive = false;

			document.documentElement.draggable = true;
			document.documentElement.style.userSelect = "all";
			cloudSelection.setAttribute("style", "");
			onComplete(intersectionsNotes);
			container.removeEventListener("mousemove", mouseMoveHandler);
		};
		const mouseLeaveHandler = (e: MouseEvent) => {
			// cloudSelection.setAttribute("style", "");
			// container.removeEventListener("mousemove", mouseMoveHandler);
		};

		container.addEventListener("mousedown", mouseDownHandler);
		container.addEventListener("mouseup", mouseUpHandler);
		container.addEventListener("mouseleave", mouseLeaveHandler);
		runnedSelectWithCloud = true;
	}
}
