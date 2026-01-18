interface PDFParseResult {
	numpages: number;
	numrender: number;
	info: {
		PDFFormatVersion?: string;
		IsAcroFormPresent?: boolean;
		IsXFAPresent?: boolean;
		Title?: string;
		Author?: string;
		Subject?: string;
		Keywords?: string;
		Creator?: string;
		Producer?: string;
		CreationDate?: Date;
		ModDate?: Date;
		[key: string]: unknown;
	};
	metadata: {
		[key: string]: unknown;
	};
	version: string;
	text: string;
}

interface PDFParseOptions {
	version?: string;
	max?: number;
	[key: string]: unknown;
}

type PDFParseFunction = (
	dataBuffer: Buffer | Uint8Array,
	options?: PDFParseOptions,
) => Promise<PDFParseResult>;

declare module "pdf-parse/lib/pdf-parse" {
	const pdfParse: PDFParseFunction;
	export default pdfParse;
}
