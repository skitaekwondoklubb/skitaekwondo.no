select p.firstname, p.lastname, p.age, p.email, p.telephone, c.name, r.sleepover, g.grade, g.isdan, r.vegan, r.allergies, r.otherinfo,  r.wantstoinstruct, r.gradering, y.paid, y.amount, y.vipps
from person p 
JOIN vinterleirregistration r ON r.personid = p.personid 
JOIN grade g ON r.gradeid = g.gradeid 
JOIN club c ON c.clubid = r.clubid 
JOIN payment y ON r.paymentid = y.paymentid
where r.cancelled = false