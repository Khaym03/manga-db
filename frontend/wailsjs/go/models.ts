export namespace mangadb {
	
	export class GetAllMangaDetailsRow {
	    manga_id: number;
	    title: string;
	    subtitle?: string;
	    synopsis: string;
	    score: number;
	    members: number;
	    cover_image_path: string;
	    publication_year: number;
	    type: string;
	    status: string;
	    total_volumes?: number;
	    total_chapters?: number;
	    genres: string;
	    authors: string;
	    serializations: string;
	    demographics: string;
	    themes: string;
	
	    static createFrom(source: any = {}) {
	        return new GetAllMangaDetailsRow(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.manga_id = source["manga_id"];
	        this.title = source["title"];
	        this.subtitle = source["subtitle"];
	        this.synopsis = source["synopsis"];
	        this.score = source["score"];
	        this.members = source["members"];
	        this.cover_image_path = source["cover_image_path"];
	        this.publication_year = source["publication_year"];
	        this.type = source["type"];
	        this.status = source["status"];
	        this.total_volumes = source["total_volumes"];
	        this.total_chapters = source["total_chapters"];
	        this.genres = source["genres"];
	        this.authors = source["authors"];
	        this.serializations = source["serializations"];
	        this.demographics = source["demographics"];
	        this.themes = source["themes"];
	    }
	}
	export class SearchMangaByTitleRow {
	    manga_id: number;
	    title: string;
	    subtitle?: string;
	    synopsis: string;
	    score: number;
	    members: number;
	    cover_image_path: string;
	    publication_year: number;
	    type: string;
	    status: string;
	    total_volumes?: number;
	    total_chapters?: number;
	    genres: string;
	    authors: string;
	    serializations: string;
	    demographics: string;
	    themes: string;
	
	    static createFrom(source: any = {}) {
	        return new SearchMangaByTitleRow(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.manga_id = source["manga_id"];
	        this.title = source["title"];
	        this.subtitle = source["subtitle"];
	        this.synopsis = source["synopsis"];
	        this.score = source["score"];
	        this.members = source["members"];
	        this.cover_image_path = source["cover_image_path"];
	        this.publication_year = source["publication_year"];
	        this.type = source["type"];
	        this.status = source["status"];
	        this.total_volumes = source["total_volumes"];
	        this.total_chapters = source["total_chapters"];
	        this.genres = source["genres"];
	        this.authors = source["authors"];
	        this.serializations = source["serializations"];
	        this.demographics = source["demographics"];
	        this.themes = source["themes"];
	    }
	}

}

