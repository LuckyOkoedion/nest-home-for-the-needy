import { RequestMethod } from "@nestjs/common"


// export const authExcludedRoutes = [
// { path: '/api/admin/user/register', method: RequestMethod.POST },
// { path: '/api/admin/blog', method: RequestMethod.GET },
// { path: '/api/admin/blog/:blogId', method: RequestMethod.GET },
// { path: '/api/admin/blog/allComments/:blogId', method: RequestMethod.GET },
// { path: 'api/site/about-page', method: RequestMethod.GET },
// { path: 'api/site/blog-page', method: RequestMethod.GET },
// { path: 'api/admin/gallery', method: RequestMethod.GET },
// { path: 'api/admin/gallery/:pictureId', method: RequestMethod },
// { path: 'api/site/home-page', method: RequestMethod.GET },
// { path: 'api/site/vav-footer', method: RequestMethod.GET }
// ]

export const userControllerAuthRoutesExcludes = [
    { path: '/api/admin/user/register', method: RequestMethod.POST },
    { path: '/api/admin/user/login', method: RequestMethod.POST }

]

export const blogControllerAuthRoutesExcludes = [
    { path: '/api/admin/blog', method: RequestMethod.GET },
    { path: '/api/admin/blog/:blogId', method: RequestMethod.GET },
    { path: '/api/admin/blog/allComments/:blogId', method: RequestMethod.GET },
]

export const aboutPageControllerAuthRoutesExcludes = [
    { path: 'api/site/about-page', method: RequestMethod.GET },


]

export const blogPageControllerAuthRoutesExcludes = [
    { path: 'api/site/blog-page', method: RequestMethod.GET },


]

export const galleryControllerAuthRoutesExcludes = [
    { path: 'api/admin/gallery', method: RequestMethod.GET },
    { path: 'api/admin/gallery/:pictureId', method: RequestMethod.GET },


]

export const homePageControllerAuthRoutesExcludes = [
    { path: 'api/site/home-page', method: RequestMethod.GET }


]

export const navFooterControllerAuthRoutesExcludes = [
    { path: 'api/site/nav-footer', method: RequestMethod.GET }


]