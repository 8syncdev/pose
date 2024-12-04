import adminPic from '@/public/teamdev/members/admin.jpg'
import dev1QuangAnh from '@/public/teamdev/members/dev-1.jpg'
import dev2HieuAnh from '@/public/teamdev/members/dev-2.jpg'
import dev3MinhChien from '@/public/teamdev/members/dev-3.jpg'
import dev4ThanhDuc from '@/public/teamdev/members/dev-4.jpg'
import dev5Thang from '@/public/teamdev/members/dev-5.jpg'
//* Neon name: MY_TEAM
import name1 from '@/public/teamdev/design/name-mem-1.png'
import name2 from '@/public/teamdev/design/name-mem-2.png'
import name3 from '@/public/teamdev/design/name-mem-3.png'
import name4 from '@/public/teamdev/design/name-mem-4.png'
import name5 from '@/public/teamdev/design/name-mem-5.png'
import name6 from '@/public/teamdev/design/name-mem-6.png'



export const MY_TEAM = {
    members: [
        {
            name: 'Nguyễn Phương Anh Tú',
            major: 'Fullstack Developer',
            desc: 'Anh chào mừng các bạn đến với khóa học của 8Sync Dev. Anh là người sáng lập ra khóa học này, mong muốn giúp các bạn có thêm kiến thức và kỹ năng trong lĩnh vực lập trình.',
            role: 'Founder',
            phone: '0767449819',
            tech_stack: 'ReactJS, NextJS, MongoDB, Fast, Flutter, Django, Flask, Pytorch AI/ML, DRF, React Native, Security/Microservice Architecture, Docker',
            avatar_img: adminPic,
            neon_name_img: name1
        },
        {
            name: 'Đinh Thành Đức',
            major: 'Frontend Developer',
            desc: 'Chào các bạn, mình là Đức, mình là người đồng sáng lập ra khóa học này, mong muốn giúp các bạn vững vàng hơn trong lĩnh vực lập trình.',
            role: 'Co-Founder',
            phone: '',
            tech_stack: 'ReactJS, NextJS, Flutter, VueJS, NuxtJS, SvelteJS, AngularJS, Security/Microservice Architecture, Docker',
            avatar_img: dev4ThanhDuc,
            neon_name_img: name4
        },
        // {
        //     name: 'Lê Quốc Thắng',
        //     major: 'Frontend Developer',
        //     desc: 'Chào các bạn, mình là Thắng, mình là người đồng sáng lập ra khóa học này, mong muốn giúp các bạn vững vàng hơn trong lĩnh vực lập trình.',
        //     role: 'Co-Founder',
        //     phone: '',
        //     tech_stack: 'ReactJS, NextJS, Flutter, VueJS, NuxtJS, SvelteJS, AngularJS, Security/Microservice Architecture, Docker',
        //     avatar_img: dev5Thang,
        //     neon_name_img: name6
        // },
        // {
        //     name: 'Đinh Hữu Quang Anh',
        //     major: 'Backend Developer',
        //     desc: 'Chào các bạn, mình là Quang Anh, mình là người đồng sáng lập ra khóa học này, mong muốn giúp các bạn nâng việc lập trình lên một tầm cao mới.',
        //     role: 'Co-Founder',
        //     phone: '',
        //     tech_stack: 'NodeJS, ExpressJS, MongoDB, Firebase, Django, Flask, React Native, Security/Microservice Architecture, Docker',
        //     avatar_img: dev1QuangAnh,
        //     neon_name_img: name2
        // },
        // {
        //     name: 'Đặng Hiếu Anh',
        //     major: 'Frontend Developer',
        //     desc: 'Chào các bạn, mình là Hiếu Anh, mình là người đồng sáng lập ra khóa học này, mong muốn giúp các bạn có thêm kiến thức để phát triển bản thân trong lĩnh vực lập trình',
        //     role: 'Co-Founder',
        //     phone: '',
        //     tech_stack: 'ReactJS, NextJS, Flutter, VueJS, NuxtJS, SvelteJS, AngularJS, Security/Microservice Architecture, Docker',
        //     avatar_img: dev2HieuAnh,
        //     neon_name_img: name3
        // },
        // {
        //     name: 'Nguyễn Đình Minh Chiến',
        //     major: 'Frontend Developer',
        //     desc: 'Chào các bạn, mình là Minh Chiến, mình là người đồng sáng lập ra khóa học này, mong muốn giúp các bạn có thêm kiến thức để phát triển bản thân trong lĩnh vực lập trình',
        //     role: 'Co-Founder',
        //     phone: '',
        //     tech_stack: 'ReactJS, NextJS, Flutter, VueJS, NuxtJS, SvelteJS, AngularJS, Security/Microservice Architecture, Docker',
        //     avatar_img: dev3MinhChien,
        //     neon_name_img: name5
        // }, 
    ]
}

export type TeamMemberTYPE = typeof MY_TEAM.members[0]