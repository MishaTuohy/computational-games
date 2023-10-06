export const textConfig = {
    PAGES : {
        HOME: {
            INTRO: {
                TITLE1: 'Student Project: Michael Alexey Tuohy',
                TITLE2: 'Educational Application:',
                TITLE3: 'Computational Thinking',
                DESC: 'This project aims to create a platform with the objective of teaching computational thinking to young adolescents through the medium of games.',
                IMG: '/images/GroupMembers.png'
            },
            AIM: {
                TITLE: 'Aims',
                DESC: 'The project aims to accomplish these three goals',
                AIMS: [
                    {title:'Fun', desc:'For students or people of any age, when something is set out as a task, it becomes work to do. This aims to garner interest by changing the lens of doing “work” to instead, competing against classmates and/or working together as a team.'},
                    {title:'Education', desc:'By changing the lense of "work" to "fun", students can passively take in concepts and practically apply concepts through problem solving.'},
                    {title:'Ease of Use', desc:'In an already chaotic classroom, the last thing needed is a complicated piece of software that takes longer to set up then to actually play. With a few clicks you can have a game up and running.'}
                ]
            },
            GAMES: {
                TITLE: 'Games',
                GAMES_SUPPORT: 'These are the games we currently support',
                GAMES_LIST: [
                    {
                        img: './images/games/tictactoe/tictac.webp', 
                        title : 'TicTacToe', 
                        desc : 'Play a game of Tic Tac Toe with a friend!', 
                        game : 'tictactoe',
                        buttonText: 'Try out'
                    },
                    {
                        img: './images/games/coincollector/map.png', 
                        title : 'CoinCollector', 
                        desc : 'See who amongst your friends can collect the most coins!', 
                        game : 'coincollector',
                        buttonText: 'Try out'
                    }
                ],
            }
        },
    },
    COMMON : {
        NAVBAR: {
            BASE: {
                HEADER: {
                    AIMS: 'Aims',
                    GAMES: 'Games',
                    LOGIN: 'Login'
                },
            },
            GAME: {
                HEADER: {
                    EXIT: 'Exit',
                    INVITE: 'Invite'
                },
            },
        },
        FOOTER: {
            CONTACT: 'Contact',
            EMAIL: 'michael.tuohy.2020@mumail.ie',
            UNIVERSITY: 'Copyright © 2023 Maynooth University.'
        },
    }
};