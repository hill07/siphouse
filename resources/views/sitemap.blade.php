<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{{ route('home') }}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    @foreach ($amcs as $amc)
        <url>
            <loc>{{ route('amc.show', $amc->slug) }}</loc>
            <lastmod>{{ $amc->updated_at->toAtomString() }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
    @endforeach
    @foreach ($funds as $fund)
        <url>
            <loc>{{ route('fund.show', ['scheme_code' => $fund->scheme_code, 'slug' => $fund->slug]) }}</loc>
            <lastmod>{{ $fund->updated_at->toAtomString() }}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.6</priority>
        </url>
    @endforeach
</urlset>
