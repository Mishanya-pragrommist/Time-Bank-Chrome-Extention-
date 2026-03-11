# Welcome to Time Bank!
This is a Chrome extention intended to make controlling time on social media easier. In which exact way? Let me explain.

## 1) What is Time Bank?
The main working principle of Time Bank is that it converts your time into a currency. 
Every day you receive some time on social media, and you can spend it anyway you want.
For example, if you have 2 hours left, you can use 30 minutes in morning,
another 30m - before dinner, and the rest - while you're relaxing after work/studying etc.
This forces the user to reconsider their attitude towards time, 
because here it is a resource that tends to be spent and which is not so easy to restore.

## 2) How to work with Time Bank?
Before using Time Bank, let's setup it by following next steps
1. Open Settings (Настройки) page.
2. Set the daily limit. It shows how much time you will receive every day.
3. Set the size of maximum daily bonuses. Take into account that bonus size cannot be bigger than daily limit.
4. Go to page Black list (Черный список). Here enter all websites you want to set time constraints to.

Now it is time to start working! Main flow looks like that:
1) Enter time you want to spend on social medias in the timer, or just press preset button. Extention will automatically substract needed amount of time.
2) Press "Start" button and enjoy your content. At any moment you can pause and stop timer. If timer is stopped, the rest of the time will be returned to account
3) After the time is gone, you'll hear a sound, a popup will appear and the content on all websites from blacklist will be blocked. 

Overall you can: a) repeat this cycle until you run out of time; b) switch to work mode;
c) do other stuff that doesn't involve social medias (touch some grass, for example).

## 3) Bonuses
If you have done something good today, like went for a 30mins walk, you can add time to your todays account.
For that, click "Add" (Добавить) on the main page, enter the amount of bonus (<= 20 mins), a short description what this bonus is for. 
Simple, isn't it?

## 4) Work mode
In paragraph #2 some work mode was mentioned. Basically, this is a mode which allows you to use social medias for work/studying purposes.
While it's active, the time from your current account won't be substracted.
To activate work mode, go to Work mode page (Режим работы), enter the amount of time (same as for main page), 
the description of what you're going to do. and then press "Start". 

Developer note: it would be nice if this also could block news feed + recomendations and allowed searching manually. 
However, this looks more like an separate project (smthg like YoutubeController).
And also different socialmedias would require different blocking scripts...
Currently it's only user's responsibility not to use work mode for doom scrolling.
Therefore, it's the most vulnerable place in the project. Sadly =(

## 5) Spendings journal
On page Spendings Journal (Журнал трат) you can see all your transactions: when you added time, 
when you substracted it, when you started/stopped timer, when you stopped the extention and so on.
More details about what data is collected is in the paragraph #6.

## 6) Data usage
The Time Bank stores all your daily time expenditures and earnings in local storage, 
along with events like "work mode launched for a certain number of minutes," 
"extension disabled," "time spent on the website," and so on.
Your personal data (such as entered passwords or email addresses) 
is NOT stored here, and no information is send to third-party servers, 
as any Time Bank servers don't exist. Don't worry about your privacy, pal)
