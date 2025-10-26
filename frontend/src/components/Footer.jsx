import React from "react";

const Footer = ({ completedTasksCount, activeTasksCount }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                Tuyen voi! Bam da hoan thanh {completedTasksCount} viec
                {activeTasksCount > 0 &&
                  `, con ${activeTasksCount} viec nua thoi`}
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
