import { randomIntegerBetween, sample } from "@std/random";

const loremIpsum =
	`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pretium nisi libero, vel lacinia enim vestibulum tempus. Duis hendrerit sem quis ex ornare, sed pretium sem porttitor. Integer vestibulum sit amet dui ac convallis. Praesent ac egestas ante, vel pulvinar sapien. Proin vel lacus eleifend, suscipit nibh quis, laoreet augue. Proin sit amet nibh convallis dui ultrices faucibus a at velit. Cras commodo ligula in posuere dapibus. Phasellus aliquam sem vulputate ornare dapibus. In efficitur, risus et pellentesque placerat, nunc est fringilla tellus, id laoreet leo tellus et sapien. Ut mattis interdum egestas. Donec posuere ullamcorper leo, at egestas ligula accumsan sed. Nullam ac dolor leo. Aliquam ut enim vel mauris sagittis porta. Duis et elementum magna.

Proin metus sapien, semper quis viverra at, dapibus tempor mi. Vestibulum nisi mi, consectetur ut augue eget, venenatis laoreet ante. Nullam finibus est vel velit egestas convallis eu vitae nibh. Proin turpis velit, pharetra ac tincidunt a, lacinia vel odio. Integer magna libero, volutpat id est at, lacinia rhoncus augue. Sed consectetur urna ac velit vestibulum pharetra. Donec ut nisl lobortis, euismod ipsum at, commodo lectus. Aliquam imperdiet, lorem non semper tincidunt, massa turpis ornare dui, ut maximus tortor ante ut sem.

Cras sodales ut arcu in facilisis. Donec tincidunt a odio ut ultricies. Sed id massa a nunc tempus varius et vel libero. Suspendisse pretium augue magna, ut efficitur augue congue vitae. Fusce et enim sit amet erat fringilla dictum. Nunc sodales eros sit amet lectus cursus, id vehicula sapien pellentesque. Cras suscipit mauris id augue hendrerit, vitae ullamcorper lectus rhoncus.

Nunc tempus dolor ante, interdum dictum dui volutpat auctor. Mauris ut tincidunt mi. Praesent posuere fringilla pellentesque. Maecenas dictum eget augue ac gravida. Praesent vitae tortor vel sapien accumsan bibendum non ac lorem. Morbi fermentum malesuada risus nec vestibulum. Vestibulum sollicitudin nibh ipsum, hendrerit pellentesque dui posuere non.

Donec dignissim nulla eu molestie venenatis. Quisque convallis nisl libero, sed eleifend elit placerat non. Sed augue ante, rhoncus sit amet arcu in, accumsan pellentesque lorem. Sed ante neque, consequat quis gravida tempor, semper eget lacus. Praesent volutpat aliquet rutrum. Ut fermentum faucibus sagittis. In lobortis est id leo lacinia, et viverra ipsum sodales. Proin condimentum aliquam efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor justo ligula, vitae pharetra lectus fermentum ac. Nunc ac iaculis est.

Maecenas non facilisis lacus, vel lacinia velit. Pellentesque ut velit faucibus, congue magna in, porttitor velit. Phasellus a tellus laoreet, blandit ipsum id, sollicitudin elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam in euismod dolor. Vestibulum in consequat tortor, vel malesuada justo. Ut luctus bibendum augue vitae consectetur.

Morbi ultrices et neque sit amet iaculis. Nullam ultrices lectus enim, ac aliquet lorem maximus eu. Integer gravida risus fringilla, ultricies lorem sed, sagittis quam. Praesent nulla augue, consequat eu pretium eu, fringilla nec lacus. Quisque bibendum interdum tortor, nec pharetra mi euismod et. Fusce ut nibh et nisi convallis tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris vestibulum gravida felis, vel elementum magna condimentum sit amet. Nullam at velit scelerisque, mattis orci quis, porttitor tellus. Nam suscipit nibh nec nisi blandit, quis convallis tortor aliquet. In eu nulla dui. Maecenas a sem nec orci pharetra fringilla. Aenean ultricies sollicitudin lobortis. Maecenas viverra lorem eget nisi suscipit, vitae ultricies massa tristique.

Nulla facilisis non quam in pharetra. Nullam id ligula eget est venenatis mattis. Nulla pharetra, ex id pharetra tristique, augue est lobortis nibh, vitae ultricies urna ligula non eros. Proin id pellentesque orci, eget vulputate metus. Curabitur lobortis et justo nec interdum. Vestibulum vel lacinia lacus. Suspendisse luctus mauris id feugiat finibus. Sed quis hendrerit elit. Nullam egestas mi nec ante pretium pretium. Etiam ullamcorper felis sit amet euismod tincidunt. Donec quis diam in orci porta commodo. Morbi sit amet nisi non lectus vehicula aliquam. Mauris aliquet viverra rhoncus. Donec vehicula mattis magna.

Maecenas nunc sem, suscipit sed auctor id, congue sed ipsum. Sed convallis fermentum erat, tempus volutpat arcu dictum eu. Duis sagittis condimentum sem vel laoreet. Maecenas gravida sem at arcu tempus semper. Mauris diam ante, venenatis eu quam eu, ornare fringilla diam. Nulla facilisi. Suspendisse eget fermentum erat. Nunc at metus vel odio maximus feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris sit amet convallis eros, vel luctus tellus. Nulla tristique non arcu vel luctus. Nulla eu ultrices eros. Integer rhoncus purus dolor, id lacinia odio pulvinar nec. Sed iaculis nibh felis, ac elementum est egestas sit amet. Nam venenatis metus ut nibh eleifend, lobortis imperdiet leo tincidunt.

Fusce sit amet commodo turpis. Duis vitae ligula quis lorem gravida hendrerit sit amet quis libero. Sed vulputate ornare maximus. Suspendisse sed scelerisque massa, sit amet maximus ligula. Fusce eu lorem vestibulum, scelerisque lorem nec, sagittis orci. Suspendisse vitae ultricies lacus. Vestibulum iaculis non massa at mollis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget mauris sagittis, interdum dui et, aliquet felis. Vestibulum euismod eleifend sapien, non tempor sem pretium sed.`
		.toLowerCase().replace(/\s{2,}|[.,]/g, "").split(" ");

export function genBool() {
	return sample([true, false]);
}

export function genText({ minWords = 1, maxWords = 5 }: { minWords?: number; maxWords?: number } = {}) {
	const words = randomIntegerBetween(minWords, maxWords);
	return Array(words).fill(null).map(() => loremIpsum[randomIntegerBetween(0, loremIpsum.length - 1)]).join(" ");
}

export function genId() {
	return crypto.randomUUID();
}

export function genDatetime() {
	return `${randomIntegerBetween(2000, 2026)}-0${randomIntegerBetween(1, 9)}-${randomIntegerBetween(0, 2)}${
		randomIntegerBetween(1, 9)
	}T1${randomIntegerBetween(0, 9)}:0${randomIntegerBetween(0, 9)}:5${randomIntegerBetween(0, 9)}.123Z`;
}
