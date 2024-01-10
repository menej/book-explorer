class MuseumObject {
    constructor(
        objectID,    // Identifying number for each artwork (unique for each)
        title,       // Title, identifying phrase, or name given to a work of art
        objectName,  // Describes the physical type of the object
        medium,      // Refers to the materials that were used to create the artwork
        dimensions,  // Size of the artwork or object

        period,      // Time or time period when an object was created
        city,        // City where the artwork was created
        state,       // State or province where the artwork was created, may sometimes overlap with County
        county,      // County where the artwork was created, may sometimes overlap with State
        country,     // Country where the artwork was created or found
        culture,     // Information about the culture, or people from which an object was created
        dynasty,     // Dynasty under which an object was created
        reign,       // Reign of a monarch or ruler under which an object was created

        linkResource,       // URL to object's page on metmuseum.org
        objectWikidata_URL, // Wikidata URL for the object
        primaryImage,       // URL to the primary image of an object in JPEG format
        primaryImageSmall,  // URL to the lower-res primary image of an object in JPEG format
        additionalImages,   // An array containing URLs to the additional images of an object in JPEG format

        department,         // Indicates the Met's curatorial department responsible for the artwork
        accessionYear,      // Year the artwork was acquired
        repository,         // Where the object is located
        metadataDate,       // Date metadata was last updated
        isHighlight,        // When "true" indicates a popular and important artwork in the collection
        isPublicDomain,     // When "true" indicates an artwork in the Public Domain

        artistDisplayName,  // Artist name in the correct order for display
        artistDisplayBio,   // Nationality and life dates of an artist, also includes birth and death city when known
        artistNationality,  // Nationality of the creator or institution that made the work
        artistBeginDate,    // Year the artist was born
        artistEndDate,      // Year the artist passed away
        artistWikidata_URL, // Wikidata URL for the artist
    ) {

        this.objectID = objectID;
        this.title = title;
        this.objectName = objectName;
        this.culture = culture;
        this.period = period;
        this.dynasty = dynasty;
        this.reign = reign;
        this.artistDisplayName = artistDisplayName;
        this.artistDisplayBio = artistDisplayBio;
        this.artistNationality = artistNationality;
        this.artistBeginDate = artistBeginDate;
        this.artistEndDate = artistEndDate;
        this.artistWikidata_URL = artistWikidata_URL;
        this.medium = medium;
        this.dimensions = dimensions;
        this.city = city;
        this.state = state;
        this.county = county;
        this.country = country;
        this.linkResource = linkResource;
        this.repository = repository;
        this.metadataDate = metadataDate;
        this.objectWikidata_URL = objectWikidata_URL;
        this.isHighlight = isHighlight;
        this.accessionYear = accessionYear;
        this.isPublicDomain = isPublicDomain;
        this.primaryImage = primaryImage;
        this.primaryImageSmall = primaryImageSmall;
        this.additionalImages = additionalImages;
        this.department = department;
    }
}

