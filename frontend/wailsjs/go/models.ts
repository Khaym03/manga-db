export namespace mangadb {
	
	export class Genre {
	    genre_id: number;
	    genre_name: string;
	
	    static createFrom(source: any = {}) {
	        return new Genre(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.genre_id = source["genre_id"];
	        this.genre_name = source["genre_name"];
	    }
	}

}

export namespace model {
	
	export class RawManga {
	    title: string;
	    subtitle?: string;
	    synopsis: string;
	    score: number;
	    members: number;
	    cover_image_path: string;
	    genres: string[];
	    publication_year: number;
	    type: string;
	    status: string;
	    total_volumes?: number;
	    total_chapters?: number;
	    authors: string[];
	    serializations: string[];
	    demographics: string[];
	    themes: string[];
	
	    static createFrom(source: any = {}) {
	        return new RawManga(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.subtitle = source["subtitle"];
	        this.synopsis = source["synopsis"];
	        this.score = source["score"];
	        this.members = source["members"];
	        this.cover_image_path = source["cover_image_path"];
	        this.genres = source["genres"];
	        this.publication_year = source["publication_year"];
	        this.type = source["type"];
	        this.status = source["status"];
	        this.total_volumes = source["total_volumes"];
	        this.total_chapters = source["total_chapters"];
	        this.authors = source["authors"];
	        this.serializations = source["serializations"];
	        this.demographics = source["demographics"];
	        this.themes = source["themes"];
	    }
	}

}

