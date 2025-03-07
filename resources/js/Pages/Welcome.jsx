import { Link, Head } from '@inertiajs/react';
import MapContainer from '@/Components/MapContainer';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            {/* Fondo Página */}
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
                {/* Links Registro */}
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
   
                {/* MAPA */}
                <MapContainer/>
                <div id="map"></div>   

                <div className="sm:fixed sm:top-0 sm:left-0 text-start p-4 md:p-6 flex items-center justify-between max-w-screen-md mx-auto">

                    <div className="bg-custom-green flex items-center space-x-4 p-4 md:p-6 max-w-[calc(100%-4rem)]">
                        <a className="navbar-brand" href="#">
                            {/* Contenido del logo */}
                            <picture>
                                <source srcSet="img/header/Logotipo_Original_Mini.png" type="image/png" alt='Imagen Logotipo' />
                                <img src='img/header/Logotipo_Original_Mini.svg' type="image/svg" alt='Imagen Logotipo' className="h-12 md:h-16" />
                            </picture>
                        </a>
                        <form className="flex flex-1" role="search">
                            <input className="form-control me-2 bg-transparent custom-green_border_bottom w-full" type="search" placeholder="Buscar" aria-label="Search" />
                        </form>
                    </div>

                    <div >
                        <a className="sm:fixed sm:top-0 sm:right-0 p-6 text-end" href="#">
                            {/* Contenido de la foto de perfil */}
                            <picture>
                                <source srcSet="img/header/Perfil_Usuario.png" type="image/png" alt='Imagen Logotipo' />
                                <img src='img/header/Perfil_Usuario.svg' type="image/svg" alt='Imagen Logotipo' className="custom-tam" />
                            </picture>
                        </a>
                    </div>

                </div>



            </div>

        </>
    );
}
