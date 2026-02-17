-- Optional seed data

insert into public.collections (slug, name, tagline, description, hero_image_url, sort_order)
values
  ('monolith', 'The Monolith Collection', 'Permanence in form', 'Inspired by ancient stone monuments, each piece embodies weight, presence, and timeless stability. Crafted from solid materials that age gracefully.', null, 1),
  ('stillness', 'The Stillness Collection', 'Quiet refinement', 'Furniture designed for contemplation. Clean lines, soft curves, and materials that invite pause. A meditation on space and silence.', null, 2),
  ('origin', 'The Origin Series', 'Return to essence', 'Stripped to fundamental forms, this collection celebrates raw materials in their most honest expression. Wood grain, stone texture, metal patina.', null, 3)
on conflict (slug) do update
set
  name = excluded.name,
  tagline = excluded.tagline,
  description = excluded.description,
  hero_image_url = excluded.hero_image_url,
  sort_order = excluded.sort_order;

insert into public.products (
  collection_id,
  slug,
  name,
  price,
  description,
  philosophy,
  materials,
  dimensions,
  image_url,
  gallery,
  sort_order,
  active
)
select c.id,
       p.slug,
       p.name,
       p.price,
       p.description,
       p.philosophy,
       p.materials,
       p.dimensions,
       p.image_url,
       p.gallery,
       p.sort_order,
       true
from (
  values
    ('monolith', 'monolith-console', 'Monolith Console', 4800, 'A commanding presence in any entrance. Solid travertine with hand-finished edges.', 'The console stands as a testament to permanence - a piece that grows more beautiful with each passing year, acquiring the patina of lived experience.', '{Italian Travertine,Bronze Hardware}'::text[], 'W 160cm x D 45cm x H 85cm', null, '{}'::text[], 1),
    ('monolith', 'monolith-dining-table', 'Monolith Dining Table', 12500, 'Where gatherings become rituals. A singular slab of limestone on a blackened steel base.', 'The dining table is the altar of the home - a place where stories are shared and bonds are strengthened.', '{Portuguese Limestone,Blackened Steel}'::text[], 'W 280cm x D 110cm x H 76cm', null, '{}'::text[], 2),
    ('stillness', 'stillness-lounge-chair', 'Stillness Lounge Chair', 3200, 'Designed for hours of quiet contemplation. Oak frame with natural linen upholstery.', 'In stillness, we find ourselves. This chair invites moments of reflection and rest.', '{White Oak,Belgian Linen,Horsehair Fill}'::text[], 'W 78cm x D 85cm x H 72cm', null, '{}'::text[], 1),
    ('stillness', 'stillness-daybed', 'Stillness Daybed', 5600, 'A sanctuary for rest. Solid walnut platform with organic cotton mattress.', 'The daybed exists between waking and dreaming - a liminal space for restoration.', '{American Walnut,Organic Cotton,Natural Latex}'::text[], 'W 200cm x D 90cm x H 35cm', null, '{}'::text[], 2),
    ('origin', 'origin-shelf-system', 'Origin Shelf System', 2800, 'Modular shelving that celebrates the beauty of raw materials. Blackened oak and patinated brass.', 'Objects deserve a stage that honors their presence without competing for attention.', '{Blackened Oak,Patinated Brass}'::text[], 'W 180cm x D 35cm x H 200cm', null, '{}'::text[], 1),
    ('origin', 'origin-side-table', 'Origin Side Table', 1400, 'A study in essential form. Solid bronze with a hand-rubbed finish.', 'The most profound design removes everything unnecessary, leaving only truth.', '{Cast Bronze}'::text[], 'Diameter 45cm x H 50cm', null, '{}'::text[], 2)
) as p(collection_slug, slug, name, price, description, philosophy, materials, dimensions, image_url, gallery, sort_order)
join public.collections c on c.slug = p.collection_slug
on conflict (slug) do update
set
  collection_id = excluded.collection_id,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  philosophy = excluded.philosophy,
  materials = excluded.materials,
  dimensions = excluded.dimensions,
  image_url = excluded.image_url,
  gallery = excluded.gallery,
  sort_order = excluded.sort_order,
  active = excluded.active;

