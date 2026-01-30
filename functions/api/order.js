export async function onRequestGet(context) {
    const { env } = context;
    try {
        const order = await env.FROZEN_KV.get('image_order');
        if (!order) {
            // Default order 1-75
            const defaultOrder = Array.from({ length: 75 }, (_, i) => i + 1);
            return new Response(JSON.stringify(defaultOrder), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        return new Response(order, {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        // Fallback if KV is not bound yet or error
        const defaultOrder = Array.from({ length: 75 }, (_, i) => i + 1);
        return new Response(JSON.stringify(defaultOrder), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const { password, order } = await request.json();

    // Check admin password (using 1192 as secret for now)
    if (password !== 'admin1192') {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        await env.FROZEN_KV.put('image_order', JSON.stringify(order));
        return new Response('Saved', { status: 200 });
    } catch (e) {
        return new Response('KV Error: ' + e.message, { status: 500 });
    }
}
