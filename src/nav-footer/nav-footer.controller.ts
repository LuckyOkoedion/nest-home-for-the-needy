import { Controller, Post, Patch, Get, Body} from '@nestjs/common';
import { NavFooterService } from './nav-footer.service';
import { CreateNavFooterDto } from './dto/create-nav-footer.dto';

@Controller('/api/site/nav-footer')
export class NavFooterController {
    constructor(private readonly navFooterService: NavFooterService) {}

    @Post()
    async createNavFooter(@Body()navFooter: CreateNavFooterDto) {
        try {
            await this.navFooterService.createNavFooterData(navFooter);
        } catch (error) {
            console.log(error);
        }
    }
    @Get()
    async getNavFooter() {
        try {
            await this.navFooterService.getNavFooterData();
        } catch (error) {
            console.log(error);
        }
    }
    @Patch()
    async editNavFooter(@Body() edit) {
        try {
            await this.navFooterService.updateNavFooterData(edit);
        } catch (error) {
            console.log(error);
        }
    }

}
