import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {

	public transform(text: string, search: string, styleClasses?: string): string {
		if (!search || !text || typeof search !== 'string') {
			return text;
		}
		const pattern = search
			.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
			.split(' ')
			.filter((t) => t.length > 0)
			.join('|');
		const regex = new RegExp(pattern, 'gi');
		return search
			? text.replace(
					regex,
					(match) =>
						`<span class="${styleClasses ? styleClasses : 'highlighted-search'}">${match}</span>`
			  )
			: text;
	}
}
