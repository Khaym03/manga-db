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
	export class GetMangaGenresByMangaIDRow {
	    genre_name: string;
	    genre_id: number;
	
	    static createFrom(source: any = {}) {
	        return new GetMangaGenresByMangaIDRow(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.genre_name = source["genre_name"];
	        this.genre_id = source["genre_id"];
	    }
	}

}

export namespace model {
	
	export class Manga {
	    id: number;
	    genres: mangadb.GetMangaGenresByMangaIDRow[];
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
	
	    static createFrom(source: any = {}) {
	        return new Manga(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.genres = this.convertValues(source["genres"], mangadb.GetMangaGenresByMangaIDRow);
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
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

