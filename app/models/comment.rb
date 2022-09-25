# frozen_string_literal: true

class Comment < ApplicationRecord
  ################################ ASSOCIATIONS ################################
  belongs_to :user
  belongs_to :commentable, polymorphic: true, optional: true
  has_many :comment_replies, as: :commentable, dependent: :destroy

  ################################## SETTINGS ##################################

  ################################### SCOPES ###################################

  ################################## DELEGATES #################################

  ################################# VALIDATIONS ################################

  ################################## CALLBACKS #################################

  ################################## METHODS ##################################
  def comment_replies
    Comment.where(commentable_id: id, commentable_type: 'Comment')
  end
end
