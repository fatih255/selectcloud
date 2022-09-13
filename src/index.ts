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

export default function SelectWithCloud({
	itemsClass,
	containerClass,
	cloudStyle,
	crossEffect,
	onComplete
}: Props) {
	const container = document.querySelector(`.${containerClass}`) as HTMLElement;
	const cloudSelection = document.createElement("div") as HTMLDivElement;
	document.documentElement.append(cloudSelection);

	let intersectionsNotes: Element[] = [];
	const notes = Array.from(
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

	const startPosition = { x: 0, y: 0 };

	const mouseMoveHandler = (e: MouseEvent) => {
		if (e.clientX < startPosition.x) {
			cloudSelection.style.left = e.clientX + "px";
			cloudSelection.style.width = startPosition.x - e.clientX + "px";
		} else {
			cloudSelection.style.width = e.clientX - startPosition.x + "px";
		}
		if (e.clientY < startPosition.y) {
			cloudSelection.style.top = e.clientY + "px";
			cloudSelection.style.height = startPosition.y - e.clientY + "px";
		} else {
			cloudSelection.style.height = e.clientY - startPosition.y + "px";
		}
	};
	const mouseDownHandler = (e: MouseEvent) => {
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
		cloudSelection.style.top = e.clientY + "px";
		startPosition.x = e.clientX;
		startPosition.y = e.clientY;
		container.addEventListener("mousemove", mouseMoveHandler);
	};
	const mouseUpHandler = () => {
		cloudSelection.setAttribute("style", "");

		onComplete(intersectionsNotes);
		container.removeEventListener("mousemove", mouseMoveHandler);
	};

	container.addEventListener("mousedown", mouseDownHandler);
	container.addEventListener("mouseup", mouseUpHandler);
}
