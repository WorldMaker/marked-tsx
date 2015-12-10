const escape = (x, t) => x
const unescape = x => x

export default class Renderer {
	options: any
	
	constructor(options: any = {}) {
		this.options = options || {}
	}

	code(code, lang, escaped) {
		if (this.options.highlight) {
    		var out = this.options.highlight(code, lang)
			if (out != null && out !== code) {
				escaped = true
				code = out
			}
		}

		if (!lang) {
			return <pre><code>
				{ escaped ? code : escape(code, true) }
			</code></pre>
		}

		return <pre><code class={ this.options.langPrefix + escape(lang, true) }>
			{ escaped ? code : escape(code, true) }
		</code></pre>
	}
	
	blockquote(quote) {
		return <blockquote>{ quote }</blockquote>
	}

	html(html) {
		return html
	}

	heading(text, level, raw) {
		const id = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-')
		switch (level) {
			case 1: return <h1 id={ id }>{ text }</h1>
			case 2: return <h2 id={ id }>{ text }</h2>
			case 3: return <h3 id={ id }>{ text }</h3>
			case 4: return <h4 id={ id }>{ text }</h4>
			case 5: return <h5 id={ id }>{ text }</h5>
			default: return <h6 id={ id }>{ text }</h6>
		}
	}

	hr() {
		return <hr />
	}

	list(body, ordered) {
		if (ordered) {
			return <ol>{ body }</ol>
		}
		return <ul>{ body }</ul>
	}

	listitem(text) {
		return <li>{ text }</li>
	}

	paragraph(text) {
		return <p>{ text }</p>
	}

	table(header, body) {
		return <table>
			<thead>
				{ header }
			</thead>
			<tbody>
				{ body }
			</tbody>
		</table>
	}

	tablerow(content) {
		return <tr>{ content }</tr>
	}

	tablecell(content, flags) {
		const style = flags.align ? { textAlign: flags.align } : null
		if (flags.header) {
			return <th style={ style }>{ content }</th>
		}
		return <td style={ style }>{ content }</td>
	}

	// span level renderer
	strong(text) {
		return <strong>{ text }</strong>
	}

	em(text) {
		return <em>{ text }</em>
	}

	codespan(text) {
		return <code>{ text }</code>
	}

	br() {
		return <br />
	}

	del(text) {
		return <del>{ text }</del>
	}

	link(href, title, text) {
		if (this.options.sanitize) {
			let prot
			try {
				prot = decodeURIComponent(unescape(href))
					.replace(/[^\w:]/g, '')
					.toLowerCase()
			} catch (e) {
				return null
			}
			if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
				return null
			}
		}
		return <a href={ href }	title={ title ? title : null }>{ text }</a>
	}

	image(href, title, text) {
		return <img src={ href } alt={ text } title={ title ? title : null } />
	}
	
	text(text) {
		return text
	}
}