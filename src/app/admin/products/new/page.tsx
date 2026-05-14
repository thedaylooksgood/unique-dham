'use client';

import EditProductPage from '../edit/[id]/page';

export default function NewProductPage() {
    // We pass a dummy Promise that resolves to { id: 'new' }
    return <EditProductPage params={Promise.resolve({ id: 'new' })} />;
}
